import React, { useEffect, useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { PostCard } from "../PostCard/PostCard";
import { useLazyGetAllPostsQuery } from "../../services/postService/postService";
import Title from "antd/es/typography/Title";
import { Select } from "antd";
import { getFilteredStructure } from "../../services/service";
import { useDispatch } from "react-redux";
import { setPosts } from "../../store/reducer/postSlice/postSlice";

const Home = () => {
  const dispatch = useDispatch();

  const [fetchPosts, { data: posts, isError, isSuccess, isLoading, error }] =
    useLazyGetAllPostsQuery();

  useEffect(() => {
    fetchPosts()
      .unwrap()
      .then((response) => {
        if (response.ok) {
          dispatch(setPosts({ posts: response.result }));
        }
      });
  }, [fetchPosts, dispatch]);

  const filterData = useMemo(() => {
    return getFilteredStructure(posts?.result || []);
  }, [posts]);

  const [weekFilter, setWeekFilter] = useState(null);
  const [timeFilter, setTimeFilter] = useState(null);
  const [teacherFilter, setTeacherFilter] = useState(null);

  const handleWeekFilterChange = (value) => setWeekFilter(value);
  const handleTimeFilterChange = (value) => setTimeFilter(value);
  const handleTeacherFilterChange = (value) => setTeacherFilter(value);

  const filters = [
    {
      label: "Номер недели",
      data: filterData.weekNumbers,
      onChange: handleWeekFilterChange,
    },
    {
      label: "Время занятий",
      data: filterData.time,
      onChange: handleTimeFilterChange,
    },
    {
      label: "Преподаватель",
      data: filterData.teachers,
      onChange: handleTeacherFilterChange,
    },
  ];

  const getFilteredPosts = (posts) => {
    return (posts || []).filter((post) => {
      if (weekFilter && !Object.keys(post).some((key) => key.replaceAll(" ", "") === weekFilter)) {
        return false;
      }
      return true;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "24px 50px" }}>
      <div style={{ padding: "24px 50px", position: "sticky", top: "0px", background: "#fff", height: "250px", zIndex: 1 }}>
        <Title level={1}>Расписание занятий</Title>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Title level={5}>Filters</Title>
          <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
            {filters.map((filter) => (
              <Select
                key={filter.label}
                placeholder={filter.label}
                options={filter.data}
                onChange={filter.onChange}
              />
            ))}
          </div>
        </div>
      </div>
      {isSuccess && posts?.ok && getFilteredPosts(posts?.result || []).map((post, index) => (
        <React.Fragment key={index}>
          {Object.entries(post).map(([weekNumber, weekData]) => (
            <React.Fragment key={weekNumber}>
              <Title level={2}>Неделя - {weekNumber}</Title>
              {Object.entries(weekData).map(([day, dayData]) => {
                if (dayData.length === 0) return null;
                let filteredDayData = dayData;
                if (timeFilter) {
                  filteredDayData = filteredDayData.filter((session) => session.time === timeFilter);
                }
                if (filteredDayData.every(({ lecture }) => !lecture.name || !lecture.classroom || !lecture.teacher)) {
                  return null;
                }
                return (
                  <React.Fragment key={day}>
                    <Title level={5}>{day}</Title>
                    {filteredDayData.map((session, idx) => (
                      <PostCard key={idx} postData={session} />
                    ))}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Home;

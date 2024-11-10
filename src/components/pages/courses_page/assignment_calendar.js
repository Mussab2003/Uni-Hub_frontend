import { Card, CardContent } from "@mui/material";
import moment from "moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate("PREV");
  };
  const goToNext = () => {
    toolbar.onNavigate("NEXT");
  };
  const goToCurrent = () => {
    toolbar.onNavigate("TODAY");
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>
          Back
        </button>
        <button type="button" onClick={goToCurrent}>
          Today
        </button>
        <button type="button" onClick={goToNext}>
          Next
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
    </div>
  );
};

const AssignmentCalendar = ({ calendarEvents }) => {
  return (
    <Card>
      <div className="flex p-3">
        <h1 className="text-sm md:text-2xl text-slate-700 font-bold ">
          Assignment Calendar
        </h1>
      </div>
      <CardContent>
        <div className="h-[500px]">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%" }}
            // components={{
            //   toolbar: CustomToolbar,
            // }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AssignmentCalendar;

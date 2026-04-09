"use client";

import { useState, useEffect } from "react";

const Tracker = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableHeaders = [
    "ID",
    "Baby ID",
    "Food",
    "Food Amount",
    "Milk Amount",
    "Poop",
    "Time",
    "Date",
  ];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();

      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (loading) {
    return <div className="p-4">Loading events...</div>;
  }

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary text-foreground">
            {tableHeaders.map((header, index) => (
              <th key={index} className="py-2 px-4 border text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event: any, index) => (
              <tr
                key={event.id || index}
                className="bg-background text-foreground hover:bg-muted"
              >
                <td className="p-2 px-4 border">{event.id}</td>
                <td className="p-2 px-4 border">{event.baby_id}</td>
                <td className="p-2 px-4 border">{event.food || "-"}</td>
                <td className="p-2 px-4 border">{event.foodamount || "-"}</td>
                <td className="p-2 px-4 border">{event.milkamount || "-"}</td>
                <td className="p-2 px-4 border">{event.poop ? "Yes" : "No"}</td>
                <td className="p-2 px-4 border">{event.time}</td>
                <td className="p-2 px-4 border">{formatDate(event.date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={tableHeaders.length}
                className="p-4 text-center text-muted-foreground"
              >
                No events found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tracker;

// src/context/EventsContext.js
import { createContext, useContext, useState } from "react";

const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  // Events state
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Innovations Summit 2024",
      description:
        "Explore the cutting-edge trends in AI, blockchain, and smart technology with industry leaders and innovators.",
      price: "Ksh 18,000",
      image:
        "https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Business Growth Conference",
      description:
        "Learn from top entrepreneurs about strategies to scale your business, increase revenue, and maximize efficiency.",
      price: "Ksh 22,500",
      image:
        "https://plus.unsplash.com/premium_photo-1679547202671-f9dbbf466db4?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "Startup Insights Forum",
      description:
        "Gain valuable knowledge from successful startup founders, investors, and mentors.",
      price: "Ksh 15,000",
      image:
        "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      title: "AI Revolution Summit",
      description:
        "Dive deep into the future of AI, machine learning, and automation.",
      price: "Ksh 20,000",
      image:
        "https://images.unsplash.com/photo-1686397140330-40f4c9919b58?w=600&auto=format&fit=crop&q=60",
    },
  ]);

  // Holidays state
  const [holidays, setHolidays] = useState([
    {
      id: 1,
      title: "Beach Getaway",
      description:
        "Relax by the ocean, enjoy stunning sunsets, and unwind in a beachfront resort.",
      price: "Ksh 12,000",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 2,
      title: "Mountain Retreat",
      description: "Escape to the mountains and enjoy scenic hiking trails.",
      price: "Ksh 10,000",
      image:
        "https://images.unsplash.com/photo-1588858027324-cdd07d015c29?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 3,
      title: "Tropical Paradise",
      description: "Enjoy white sandy beaches, crystal-clear waters, and luxury stays.",
      price: "Ksh 25,000",
      image:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=600&auto=format&fit=crop&q=60",
    },
    {
      id: 4,
      title: "Safari Adventure",
      description: "Discover wildlife and thrilling safari tours.",
      price: "Ksh 30,000",
      image:
        "https://images.unsplash.com/photo-1709403337027-45324f24fae3?w=600&auto=format&fit=crop&q=60",
    },
  ]);

  return (
    <EventsContext.Provider value={{ events, setEvents, holidays, setHolidays }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);

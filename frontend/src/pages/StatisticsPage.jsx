import { Link } from "react-router-dom";
import '../styles/Statistics.css';

function StatisticsPage() {
  const data = [
    {
      title: "Performance Analytics",
      description:
        "Explore key performance indicators such as load times, server response rates, and system uptime.",
      image: "/public/icons/icon.jpg",
    },
    {
      title: "User Engagement Metrics",
      description:
        "Dive into comprehensive data on user interactions, including daily active users, session duration, and feature usage rates.",
      image: "/public/icons/icon2.jpg",
    },
    {
      title: "Delivery Efficiency",
      description:
        "Visualize key performance indicators for shipping , including delivery times, shipping costs, and delivery success rates.",
      image: "/public/icons/icon3.jpg",
    },
  ];
  return (
    <div class="timeline-container">
      {data.map((item, index) => (
        <div className="timeline-item" key={index}>
          <div class="timeline-item-left">
            <div class="Radio">
              <input
                checked=""
                value="radio1"
                type="radio"
                name="radio"
                id="Radio1"
              />
              <label for="Radio1"></label>
            </div>
          </div>
          <div class="timeline-item-right glass-card">
            <img src={item.image} alt={item.title} class="icon-st" />
            <h3><strong>{item.title}</strong></h3>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatisticsPage;

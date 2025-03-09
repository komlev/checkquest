import {
  Chart,
  Colors,
  Filler,
  Legend,
  LineController,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale,
  Tooltip,
} from "chart.js";

Chart.register(
  Colors,
  PointElement,
  RadarController,
  RadialLinearScale,
  LineController,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

import { FC, useEffect, useRef, useState } from "react";
import { Section } from "../../../types";

type Props = {
  sections: Section[];
};

const RadarChart: FC<Props> = ({ sections }) => {
  const ref = useRef(null);
  const chart = useRef<Chart<"radar", number[], string> | null>(null);

  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    const radarValues: number[] = [];
    const radarLabels: string[] = [];

    sections.forEach((section) => {
      radarLabels.push(section.title);
      let sectionScore = 0;
      let selectedScore = 0;
      section.questions.forEach((question) => {
        sectionScore += question.score;
        if (question.checked) {
          selectedScore += question.score;
        }
      });
      radarValues.push(
        Math.min((selectedScore / (sectionScore || 1)) * 100, 100)
      );
    });

    setValues(radarValues);
    setLabels(radarLabels);
  }, [sections]);

  useEffect(() => {
    if (!ref.current || chart.current) {
      return;
    }

    const chartData = {
      labels,
      datasets: [
        {
          label: "Skills",
          data: values,
          fill: true,
          backgroundColor: "rgba(255, 99, 125, 0.2)",
          borderColor: "oklch(71% 0.194 13.428)",
          pointBackgroundColor: "oklch(71% 0.194 13.428)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "oklch(71% 0.194 13.428)",
        },
      ],
    };

    chart.current = new Chart(ref.current, {
      type: "radar",
      data: chartData,
      options: {
        plugins: { legend: { display: false }, tooltip: { enabled: false } },
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 300 },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { stepSize: 25 },
            angleLines: { color: "#EEE" },
            grid: { color: "#EEE" },
          },
        },
        elements: { line: { borderWidth: 2 } },
      },
    });
  }, [labels, values]);

  useEffect(() => {
    if (chart.current) {
      chart.current.data.labels = labels;
      chart.current.data.datasets[0].data = values;
      chart.current.update();
    }
  }, [labels, values]);

  return <canvas ref={ref}></canvas>;
};

export default RadarChart;

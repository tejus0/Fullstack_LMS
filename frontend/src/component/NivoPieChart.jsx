import { ResponsivePie } from "@nivo/pie";
import ModalComponent from "./Modal";
import React, { useEffect, useState, useMemo } from "react";
const NivoPieChart = ({ data, students }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [leadStatus, setLeadStatus] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleClick = (node) => {
    setModalTitle(node.label);
    setModalOpen(true);
    setLeadStatus(node.id);
  };

  const handleClose = () => {
    setModalOpen(false);
  };


  const filteredStudents = useMemo(() => {
    let filtered = students;
    if (leadStatus !== "All") {
      filtered = filtered.filter((user) => {
        const latestRemark = user.remarks.FollowUp3.length
          ? user.remarks.FollowUp3[user.remarks.FollowUp3.length - 1].subject
          : user.remarks.FollowUp2.length
          ? user.remarks.FollowUp2[user.remarks.FollowUp2.length - 1].subject
          : user.remarks.FollowUp1.length
          ? user.remarks.FollowUp1[user.remarks.FollowUp1.length - 1].subject
          : "No Remarks";
        return latestRemark.toLowerCase().includes(leadStatus.toLowerCase());
      });
    }
    return filtered;
  }, [leadStatus]);

  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        arcLabel={(d) => `${d.value}%`}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        onClick={(node, event) => {
          console.log(node, event);
          handleClick(node)
        }}

        // valueFormat=" >-.0~%"

        legends={[
          {
            anchor: "right",
            direction: "column",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 25,
            itemTextColor: "#000",
            
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}

        theme={{
          legends: {
            text: {
              fontSize: 12, // Increase the font size
            },
          },
        }}

        // tooltip={({ datum }) => (
        //   <div
        //     style={{
        //       padding: 12,
        //       color: datum.color,
        //       background: '#222222',
        //     }}
        //   >
        //     <strong>
        //       {datum.id}: {datum.value}% ({datum.data.count})
        //     </strong>
        //   </div>
        // )}
      />
      <ModalComponent
        open={modalOpen}
        handleClose={handleClose}
        title={modalTitle}
        data={filteredStudents}
      />
    </>
  );
};

export default NivoPieChart;

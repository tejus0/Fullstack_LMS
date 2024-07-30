import { ResponsivePie } from "@nivo/pie";
import ModalComponent from "./Modal";
import React,{ useEffect, useState, useMemo } from "react";
const NivoPieChart = ({ data, students }) => {
    const [modalOpen, setModalOpen] = useState(false);
    // const [modalData, setModalData] = useState([]);
    const [leadStatus, setLeadStatus] = useState("")
    const [modalTitle, setModalTitle] = useState("");

    const handleClick = (node) => {
      setModalTitle(node.label);
    //   setModalData(node.data);
      setModalOpen(true);
      setLeadStatus(node.label);
    };

    const handleClose = () => {
      setModalOpen(false);
    };


    // const getFilteredStudents = () =>{

    // }

    // useEffect(() =>{
    //     getFilteredStudents();
    // }, [leadStatus])

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
            return latestRemark
              .toLowerCase()
              .includes(leadStatus.toLowerCase());
          });
        }
        return filtered;
      }, [leadStatus]);


  return (
    <>
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        // enableArcLinkLabels={false}
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
        // fill={[
        //     {
        //         match: {
        //             id: 'ruby'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'c'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'go'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'python'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'scala'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'lisp'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'elixir'
        //         },
        //         id: 'lines'
        //     },
        //     {
        //         match: {
        //             id: 'javascript'
        //         },
        //         id: 'lines'
        //     }
        // ]}
          onClick={(node, event) => {
            console.log(node, event);
            handleClick(node)
          }}

        // valueFormat=" >-.0~%"
        
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
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

import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const Charts = (props) => {
    const data = props.orders.data;
    console.log('charts', data);

    const formatMonth = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1; // Tăng giá trị tháng lên 1 để đảm bảo tháng từ 1 đến 12
        return month.toString(); // Chuyển giá trị tháng thành chuỗi
    };

    const monthlyData = {}; // Đối tượng để lưu trữ tổng tiền theo tháng

    // Tính tổng tiền theo tháng
    data?.forEach((item) => {
        const month = formatMonth(item.attributes.products[0].attributes.publishedAt);
        const price = item.attributes.products[0].attributes.ProductPrice;
        if (monthlyData[month]) {
            monthlyData[month] += price;
        } else {
            monthlyData[month] = price;
        }
    });

    const formattedData = Object.keys(monthlyData).map((month) => ({
        x: month,
        y: monthlyData[month],
    }));

    return (
        <div className='dashboard-items chart-col-content'>
            <VictoryChart domainPadding={20}>
                <VictoryAxis label="Month" />
                <VictoryAxis dependentAxis tickFormat={(x) => `${x}$`} label="Total" style={{
                    axisLabel: { padding: 35 },
                    tickLabels: { padding: 5 },

                }} />
                <VictoryBar data={formattedData} x="x" y="y" style={{
                    data: {
                        fill: "#FF6384", // Màu sắc của các cột
                    },
                }} />
            </VictoryChart>
        </div>
    );
};

export default Charts;
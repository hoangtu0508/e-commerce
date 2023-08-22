import React from 'react';
import { VictoryPie, VictoryTooltip } from 'victory';

const ChartPie = (props) => {
    const colorScale = ["#FF6384", "#36A2EB", "#FFCE56", "#8C8C8C", "#FF9F40"];

    const data = props.orders.data;

    console.log(data);

    const ordersByCategory = {};
    data?.forEach((order) => {
        console.log(order);
        order?.attributes.products?.forEach((product) => {
            console.log(product);
            const category = product?.attributes.category.data
            console.log(category);
            const { CategoryName } = category?.attributes;
            if (!ordersByCategory[CategoryName]) {
                ordersByCategory[CategoryName] = 0;
            }
            ordersByCategory[CategoryName]++;
        });
    });
    // Hiển thị các đơn hàng trong từng danh mục
    const formattedData = Object.entries(ordersByCategory).map(([category, orderCount]) => ({
        category,
        orderCount,
    }));

    return (
        <div className="dashboard-items chart-pie-content">
            <VictoryPie
                data={formattedData}
                x="category"
                y="orderCount"
                colorScale={colorScale}
            />
        </div>
    );
};

export default ChartPie;
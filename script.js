// 初始化地图 - 以伦敦为中心
const map = L.map('map').setView([51.5074, -0.1278], 11);

// 添加OpenStreetMap底图
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// 更新日期
document.getElementById('update-date').textContent = new Date().toLocaleDateString();

// 示例区域数据 - 实际应替换为真实数据
const areas = [
    {
        name: "Westminster",
        coords: [[51.515, -0.14], [51.515, -0.10], [51.50, -0.10], [51.50, -0.14]],
        crimeRate: "High",
        info: "Tourist areas with high frequency of pickpocketing incidents"
    },
    {
        name: "Camden",
        coords: [[51.54, -0.15], [51.54, -0.12], [51.52, -0.12], [51.52, -0.15]],
        crimeRate: "Medium to high",
        info: "Areas with a vibrant nightlife, beware of conflicts after drinking"
    },
    {
        name: "Tower Hamlets",
        coords: [[51.5103,-0.0625], [51.5205,-0.0625], [51.5205,-0.0280], [51.5103,-0.0280]],
        crimeRate: "High",
        info: "Avoid travelling alone at night in the Whitechapel area"
    },
    {
        name: "Hackney",
        coords: [[51.5417,-0.0792], [51.5525,-0.0792], [51.5525,-0.0423], [51.5417,-0.0423]],
        crimeRate: "Medium",
        info: "Be aware of bicycle thefts"
    },
    {
        name: "Lambeth",
        coords: [[51.4807, -0.1233], [51.4920, -0.1233], [51.4920, -0.1100], [51.4870, -0.1100], [51.4870, -0.0972], [51.4807, -0.0972]],
        crimeRate: "Medium to high",
        info: "Be vigilant around Waterloo Station and Lower Marsh area"
    },
    {
        name: "Elephant & Castle",  // 更新区域名称
        coords: [[51.4957, -0.1000], [51.4957, -0.0850], [51.4850, -0.0850], [51.4850, -0.1000]],
        crimeRate: "Medium to high",  // 可保持不变或调整
        info: "Be cautious around the shopping centre and transport hub at night"  // 更新提示信息
    }
];

// 添加区域到地图
areas.forEach(area => {
    const polygon = L.polygon(area.coords, {
        color: area.crimeRate === "High" ? 'red' : 'orange',
        fillOpacity: 0.5
    }).addTo(map);
    
    // 悬停显示信息
    polygon.on('mouseover', () => {
        document.getElementById('info-panel').innerHTML = `
            <h3>${area.name}</h3>
            <p><strong>Crime Rate:</strong> ${area.crimeRate}</p>
            <p>${area.info}</p>
            <button onclick="window.location.href='areas/${area.name.toLowerCase()}.html'">More Information</button>
        `;
    });
    
    // 点击跳转
    polygon.on('click', () => {
        window.location.href = `areas/${area.name.toLowerCase()}.html`;
    });
});
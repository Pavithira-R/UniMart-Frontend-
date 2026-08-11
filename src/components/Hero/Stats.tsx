import Inventory2Icon from "@mui/icons-material/Inventory2";
import SchoolIcon from "@mui/icons-material/School";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Stats() {
    const stats = [
        {
            value: "1500+",
            label: "Products",
            icon: <Inventory2Icon fontSize="large" />,
        },
        {
            value: "5000+",
            label: "Students",
            icon: <AccountCircleIcon fontSize="large" />,
        },
        {
            value: "20+",
            label: "Universities",
            icon: <SchoolIcon fontSize="large" />,
        },
    ];

    return (
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((item) => (
                <div
                    key={item.label}
                    className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition"
                >
                    <div className="text-blue-600 flex justify-center">
                        {item.icon}
                    </div>

                    <h3 className="text-4xl font-bold text-blue-600 mt-4">
                        {item.value}
                    </h3>

                    <p className="text-gray-500 mt-2">
                        {item.label}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Stats;
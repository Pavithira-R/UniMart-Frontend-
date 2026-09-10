import { useState, useRef, useEffect } from "react";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Info from "@mui/icons-material/Info";

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: "info" | "success";
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: "1",
        title: "Welcome to UNI-MART",
        message: "Your campus trading account is active. Browse listings or list your textbooks and items.",
        time: "Just now",
        read: false,
        type: "info",
    },
    {
        id: "2",
        title: "Security Verified",
        message: "Your university email is linked for secure student-to-student transactions.",
        time: "1 hour ago",
        read: false,
        type: "success",
    },
];

export function NotificationMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
    const menuRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-xl text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition cursor-pointer"
                aria-label="Notifications"
                aria-expanded={isOpen}
            >
                <NotificationsNone className="w-5 h-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white animate-pulse" />
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50">
                    <div className="px-4 pb-3 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-gray-800">Notifications</h3>
                            {unreadCount > 0 && (
                                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                    {unreadCount} new
                                </span>
                            )}
                        </div>
                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={markAllAsRead}
                                className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                        {notifications.length === 0 ? (
                            <div className="py-8 text-center text-gray-400 text-xs">
                                No notifications at this time
                            </div>
                        ) : (
                            notifications.map((item) => (
                                <div
                                    key={item.id}
                                    className={`px-4 py-3 flex gap-3 transition ${
                                        item.read ? "bg-white" : "bg-blue-50/40"
                                    }`}
                                >
                                    <div className="mt-0.5 text-blue-600">
                                        {item.type === "success" ? (
                                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                            <Info className="w-4 h-4 text-blue-600" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-gray-800 truncate">{item.title}</p>
                                        <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.message}</p>
                                        <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotificationMenu;

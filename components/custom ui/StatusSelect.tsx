"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

type StatusSelectProps = {
    value: string;
    onChange: (newStatus: string) => void;
};

const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "Đang giao":
                return "text-blue-500";
            case "Đã giao":
                return "text-pink-500";
            case "Hủy đơn":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <SelectPrimitive.Root value={value} onValueChange={onChange}>
            <SelectPrimitive.Trigger className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                <SelectPrimitive.Value className={getStatusColor(value)}>
                    {value || "Select status"} {/* Hiển thị trạng thái hiện tại */}
                </SelectPrimitive.Value>
                <SelectPrimitive.Icon asChild>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white text-black shadow-lg">
                <SelectPrimitive.Viewport>
                    <SelectPrimitive.Item
                        value="Đang giao"
                        className={`flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 ${getStatusColor(
                            "Đang giao"
                        )}`}
                    >
                        <SelectPrimitive.ItemIndicator>
                            <Check className="h-4 w-4" />
                        </SelectPrimitive.ItemIndicator>
                        Đang giao
                    </SelectPrimitive.Item>
                    <SelectPrimitive.Item
                        value="Đã giao"
                        className={`flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 ${getStatusColor(
                            "Đã giao"
                        )}`}
                    >
                        <SelectPrimitive.ItemIndicator>
                            <Check className="h-4 w-4" />
                        </SelectPrimitive.ItemIndicator>
                        Đã giao
                    </SelectPrimitive.Item>
                    <SelectPrimitive.Item
                        value="Hủy đơn"
                        className={`flex items-center gap-2 px-2 py-1 text-sm cursor-pointer hover:bg-gray-100 focus:bg-gray-200 ${getStatusColor(
                            "Hủy đơn"
                        )}`}
                    >
                        <SelectPrimitive.ItemIndicator>
                            <Check className="h-4 w-4" />
                        </SelectPrimitive.ItemIndicator>
                        Hủy đơn
                    </SelectPrimitive.Item>
                </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
        </SelectPrimitive.Root>
    );
};

export default StatusSelect;

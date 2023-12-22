"use client";
"use strict";
exports.__esModule = true;
var client_1 = require("@/trpc/client");
var navigation_1 = require("next/navigation");
var react_1 = require("react");
var PaymentStatus = function (_a) {
    var orderEmail = _a.orderEmail, orderId = _a.orderId, isPaid = _a.isPaid;
    var router = navigation_1.useRouter();
    //api endpoint
    //check whether order is paid
    //request every 1 second to see if the status has changed
    var data = client_1.trpc.checkout.orderStatus.useQuery({ orderId: orderId }, {
        //while is not paid
        enabled: isPaid === false,
        refetchInterval: function (data) { return ((data === null || data === void 0 ? void 0 : data.isPaid) ? false : 1000); }
    }).data;
    //refresh page if order is paid, stop when order is paid
    react_1.useEffect(function () {
        if (data === null || data === void 0 ? void 0 : data.isPaid)
            router.refresh();
    }, [data === null || data === void 0 ? void 0 : data.isPaid, router]);
    return (React.createElement("div", { className: "grid mt-16 grid-cols-2 gap-x-4 text-sm text-gray-600" },
        React.createElement("div", null,
            React.createElement("p", { className: "font-medium text-gray-900" }, "Shipping To"),
            React.createElement("p", null, orderEmail)),
        React.createElement("div", null,
            React.createElement("p", { className: "font-medium text-gray-900" }, "Order Status"),
            React.createElement("p", null, isPaid ? "Payment successful" : "Pending payment"))));
};
exports["default"] = PaymentStatus;

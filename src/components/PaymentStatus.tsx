"use client";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
interface PaymentStatusProps {
	orderEmail: string;
	orderId: string;
	isPaid: boolean;
}

const PaymentStatus = ({ orderEmail, orderId, isPaid }: PaymentStatusProps) => {
	const router = useRouter();
	//api endpoint
	//check whether order is paid
	//request every 1 second to see if the status has changed
	const { data } = trpc.checkout.orderStatus.useQuery(
		{ orderId },
		{
			//while is not paid
			enabled: isPaid === false,
			refetchInterval: (data) => (data?.isPaid ? false : 1000),
		}
	);
	//refresh page if order is paid, stop when order is paid
	useEffect(() => {
		if (data?.isPaid) router.refresh();
	}, [data?.isPaid, router]);
	return (
		<div className="grid mt-16 grid-cols-2 gap-x-4 text-sm text-gray-600">
			<div>
				<p className="font-medium text-gray-900">Shipping To</p>
				<p>{orderEmail}</p>
			</div>
			<div>
				<p className="font-medium text-gray-900">Order Status</p>
				<p>{isPaid ? "Payment successful" : "Pending payment"}</p>
			</div>
		</div>
	);
};

export default PaymentStatus;

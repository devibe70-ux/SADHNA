import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amountINR, currency = "INR", tierName, userId } = body;

    const amountInPaisa = Math.round((amountINR || 108) * 100);

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret && keyId !== "" && keySecret !== "") {
      const instance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const order = await instance.orders.create({
        amount: amountInPaisa,
        currency,
        receipt: `receipt_${Date.now()}`,
        notes: {
          userId: userId || "guest",
          tierName: tierName || "Sādhaka Dakṣiṇā",
        },
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId,
        isSandbox: false,
      });
    }

    // Sandbox / Test Fallback Order ID generator
    const mockOrderId = `order_test_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: amountInPaisa,
      currency,
      keyId: keyId || "rzp_test_sadhana_demo_key",
      isSandbox: true,
    });
  } catch (err: any) {
    console.error("Razorpay order creation error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}

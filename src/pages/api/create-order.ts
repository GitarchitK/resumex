// POST /api/create-order
// Creates a Razorpay order server-side (KEY_SECRET never leaves server)
import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  const keyId = import.meta.env.RAZORPAY_KEY_ID;
  const keySecret = import.meta.env.RAZORPAY_KEY_SECRET;
  const amount = parseInt(import.meta.env.RAZORPAY_AMOUNT || '900');
  const currency = import.meta.env.RAZORPAY_CURRENCY || 'INR';

  const credentials = btoa(`${keyId}:${keySecret}`);

  try {
    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify({
        amount,          // in paise — 900 = ₹9
        currency,
        receipt: `resume_${Date.now()}`,
        notes: { product: 'ResumeRocket AI PDF' },
      }),
    });

    const order = await res.json();

    if (!res.ok) throw new Error(order.error?.description || 'Order creation failed');

    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,             // safe to send — this is the public key
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

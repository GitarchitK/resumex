export { renderers } from '../../renderers.mjs';

const POST = async () => {
  const keyId = "rzp_test_your-key-id-here";
  const keySecret = "your-razorpay-secret-here";
  const amount = parseInt("900");
  const currency = "INR";
  const credentials = btoa(`${keyId}:${keySecret}`);
  try {
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${credentials}`
      },
      body: JSON.stringify({
        amount,
        // in paise — 900 = ₹9
        currency,
        receipt: `resume_${Date.now()}`,
        notes: { product: "ResumeRocket AI PDF" }
      })
    });
    const order = await res.json();
    if (!res.ok) throw new Error(order.error?.description || "Order creation failed");
    return new Response(JSON.stringify({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId
      // safe to send — this is the public key
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

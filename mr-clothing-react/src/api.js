const API_BASE = "http://localhost:8002"; // Update if your PHP server runs on a different host/port

// Razorpay script
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
};

async function handleResponse(res) {
  let data = {};
  try {
    data = await res.json();
  } catch (e) {}

  if (!res.ok || data.success === false) {
    const msg =
      data.message ||
      (Array.isArray(data.errors) ? data.errors.join(" • ") : "") ||
      "Request failed";
    throw new Error(msg);
  }
  return data;
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(res);
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(res);
}

export async function createRazorpayOrder(amount, items) {
  return apiPost("/api_razorpay_order.php", { amount, items });
}

export async function verifyRazorpayPayment(paymentData) {
  return apiPost("/api_verify_payment.php", paymentData);
}

export async function openRazorpayCheckout(order, userEmail, userName) {
  await loadRazorpay();

  return new Promise((resolve, reject) => {
    const options = {
      key: order.key_id,
      amount: order.amount * 100,
      currency: "INR",
      name: "MR CLOTHING",
      description: "Fashion & Essentials",
      order_id: order.razorpay_order_id,
      image: "https://via.placeholder.com/100",
      prefill: {
        email: userEmail,
        name: userName,
      },
      handler: (response) => {
        resolve(response);
      },
      modal: {
        ondismiss: () => {
          reject(new Error("Payment cancelled"));
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
}

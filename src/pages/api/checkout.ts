// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";
// import { stripe } from "@/lib/stripe";




// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { priceId } = req.body

//   const successUrl = `${process.env.NEXT_URL}/success`
//   const cancelUrl = `${process.env.NEXT_URL}/`

//   const checkoutSession = await stripe.checkout.sessions.create({
//     success_url: successUrl,
//     cancel_url: cancelUrl,
//     mode: 'payment',
//     line_items: [
//       {
//         price: priceId,
//         quantity: 1,
//       }
//     ]
//   })

//   return res.status(201).json({
//     checkoutUrl: checkoutSession.url,
//   })
// }
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  let priceId;
      
  try {
    const body = await request.json();
    priceId = body.priceId;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!priceId) {
    return NextResponse.json({ error: 'Price not found.' }, { status: 400 });
  }
  try {
    const successUrl = `${process.env.NEXT_URL}/success`;
    const cancelUrl = `${process.env.NEXT_URL}/`;    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
    });
    return NextResponse.json({ checkoutUrl: checkoutSession.url }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
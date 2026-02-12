// src/app/api/contact/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import * as nodemailer from "nodemailer";

type Body = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "name, email, message are required" },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST;
    const portRaw = process.env.SMTP_PORT;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    const mailTo = process.env.MAIL_TO;
    const mailFrom = process.env.MAIL_FROM || user;

    if (!host || !portRaw || !user || !pass || !mailTo || !mailFrom) {
      return NextResponse.json(
        {
          ok: false,
          error: "missing smtp env vars",
          missing: {
            SMTP_HOST: !host,
            SMTP_PORT: !portRaw,
            SMTP_USER: !user,
            SMTP_PASS: !pass,
            MAIL_TO: !mailTo,
            MAIL_FROM: !mailFrom,
          },
        },
        { status: 500 }
      );
    }

    const port = Number(portRaw);

    // 네이버 465는 secure true 고정이 안정적입니다.
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: true,
      auth: { user, pass },
      // 일부 환경에서 TLS 핸드셰이크 이슈가 나는 경우가 있어 완화 옵션을 둡니다.
      tls: {
        rejectUnauthorized: false,
      },
    });

    // 연결/인증 즉시 검증(여기서 에러가 나면 SMTP 쪽 문제)
    await transporter.verify();

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject: `[Portfolio Contact] ${name} <${email}>`,
      text: message,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    // 서버 콘솔에 실제 원인 로그가 찍힙니다.
    console.error("[/api/contact] send failed:", e);

    const msg = e instanceof Error ? e.message : "failed to send";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

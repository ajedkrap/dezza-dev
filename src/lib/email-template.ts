export function contactEmailHtml({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const escapedMessage = message.replace(/\n/g, "<br />");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#13131a;border:1px solid rgba(124,58,237,0.2);border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(6,182,212,0.1));padding:32px 40px 24px;">
              <h1 style="margin:0;font-size:20px;font-weight:700;color:#e4e4e7;">New Contact Message</h1>
              <p style="margin:8px 0 0;font-size:13px;color:#71717a;">From your portfolio contact form</p>
            </td>
          </tr>

          <!-- Sender info -->
          <tr>
            <td style="padding:28px 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:16px 20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;">From</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#e4e4e7;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:12px;">
                    <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;">Email</p>
                    <a href="mailto:${email}" style="font-size:14px;color:#06b6d4;text-decoration:none;">${email}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:24px 40px;">
              <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#71717a;">Message</p>
              <div style="font-size:14px;line-height:1.7;color:#a1a1aa;">${escapedMessage}</div>
            </td>
          </tr>

          <!-- Reply button -->
          <tr>
            <td style="padding:0 40px 32px;">
              <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#fff;font-size:13px;font-weight:600;text-decoration:none;padding:10px 24px;border-radius:10px;">Reply to ${name}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;color:#52525b;">Sent via portfolio contact form</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
}

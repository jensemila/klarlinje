import { getAppUrl } from "./resend";

export function confirmationEmail(
  name: string | null,
  token: string
): { subject: string; html: string } {
  const appUrl = getAppUrl();
  const confirmUrl = `${appUrl}/bekreft?token=${token}`;
  const greeting = name ? `Hei ${name}` : "Hei";

  const subject = "Bekreft din plass på ventelisten — Klarlinje";

  const html = `<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F0E8;font-family:system-ui,sans-serif;color:#2C2C2C;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:#2D4A3E;padding:32px 40px;">
              <p style="margin:0;font-size:22px;font-weight:600;color:#F5F0E8;letter-spacing:0.05em;">Klarlinje</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">${greeting},</p>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">
                Takk for at du melder deg på ventelisten til Klarlinje-retreat.
                Klikk knappen under for å bekrefte e-postadressen din.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-radius:6px;background-color:#B5674D;">
                    <a href="${confirmUrl}"
                       style="display:inline-block;padding:14px 28px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;border-radius:6px;">
                      Bekreft e-postadresse
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:24px 0 0;font-size:13px;color:#6B7280;line-height:1.6;">
                Hvis knappen ikke fungerer, kopier denne lenken til nettleseren:<br/>
                <a href="${confirmUrl}" style="color:#2D4A3E;word-break:break-all;">${confirmUrl}</a>
              </p>
              <p style="margin:24px 0 0;font-size:13px;color:#6B7280;">
                Hvis du ikke meldte deg på, kan du ignorere denne e-posten.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #F5F0E8;">
              <p style="margin:0;font-size:12px;color:#6B7280;">
                Klarlinje · <a href="${appUrl}/personvern" style="color:#6B7280;">Personvernerklæring</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html };
}

export function campaignEmail(
  subject: string,
  bodyHtml: string,
  unsubscribeToken: string
): string {
  const appUrl = getAppUrl();
  const unsubscribeUrl = `${appUrl}/avmeld?token=${unsubscribeToken}`;

  return `<!DOCTYPE html>
<html lang="nb">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5F0E8;font-family:system-ui,sans-serif;color:#2C2C2C;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:8px;overflow:hidden;">
          <tr>
            <td style="background-color:#2D4A3E;padding:32px 40px;">
              <p style="margin:0;font-size:22px;font-weight:600;color:#F5F0E8;letter-spacing:0.05em;">Klarlinje</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;font-size:16px;line-height:1.8;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid #F5F0E8;">
              <p style="margin:0;font-size:12px;color:#6B7280;">
                Klarlinje ·
                <a href="${appUrl}/personvern" style="color:#6B7280;">Personvernerklæring</a> ·
                <a href="${unsubscribeUrl}" style="color:#6B7280;">Meld meg av</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

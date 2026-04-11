// Flag 8: MIME Type Mismatch - API returns text instead of image
export async function GET() {
  return new Response('CyberQuest{m1m3_typ3_m15m4tch}', {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

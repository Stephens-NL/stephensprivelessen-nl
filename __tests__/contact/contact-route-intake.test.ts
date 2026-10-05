/** @jest-environment node */
import { POST } from '@/app/api/contact/route';

const body = { name: 'TEST cockpit', email: 'test@example.com', preferredDays: [], preferredTimes: [] };
const req = () => new Request('http://x/api/contact', { method: 'POST', body: JSON.stringify(body) }) as never;

describe('contact route intake logging', () => {
    const env = { ...process.env };
    afterEach(() => { process.env = { ...env }; jest.restoreAllMocks(); });

    test('logs an error when the portaal env is unset', async () => {
        delete process.env.PORTAAL_INTERNAL_URL;
        delete process.env.INTERNAL_API_KEY;
        delete process.env.TELEGRAM_BOT_TOKEN;
        const err = jest.spyOn(console, 'error').mockImplementation(() => {});
        const res = await POST(req());
        expect((await res.json()).recorded).toBe(false);
        expect(err.mock.calls.some((c) => String(c[0]).includes('intake NOT recorded'))).toBe(true);
    });

    test('logs the status when the portaal rejects the post', async () => {
        process.env.PORTAAL_INTERNAL_URL = 'http://portaal';
        process.env.INTERNAL_API_KEY = 'k';
        delete process.env.TELEGRAM_BOT_TOKEN;
        jest.spyOn(global, 'fetch').mockResolvedValue(new Response('no', { status: 401 }));
        const err = jest.spyOn(console, 'error').mockImplementation(() => {});
        await POST(req());
        expect(err.mock.calls.some((c) => String(c[0]).includes('intake record failed') && c[1] === 401)).toBe(true);
    });
});

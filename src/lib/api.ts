/**
 * API client cho Aujunpeak Web App
 *
 * Cấu hình:
 *   VITE_API_URL=https://your-api-server.onrender.com
 *
 * Trong development nếu chạy cùng máy với API server:
 *   VITE_API_URL=http://localhost:8080
 *
 * Quan trọng: KHÔNG có trailing slash ở cuối URL.
 */
const BASE = (import.meta.env.VITE_API_URL as string) || 'http://localhost:8080';

export interface KeyData {
  id: string;
  keyValue: string;
  type: string; // 'free' | 'vip' | 'custom'
  expiryDate: string | null;
  maxDevices: number;
  deviceCount: number;
  isLocked: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiNotification {
  id: string;
  target: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface LoginHistoryItem {
  id: string;
  keyId: string;
  keyValue: string;
  deviceId: string;
  userAgent: string | null;
  ipAddress: string | null;
  action: string;
  createdAt: string;
}

export async function verifyKey(key: string, deviceId: string, ua: string) {
  const res = await fetch(`${BASE}/api/keys/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyValue: key, deviceId, userAgent: ua }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Key không hợp lệ');
  return { data: data.key as KeyData, isNewDevice: data.isNewDevice as boolean };
}

export async function getNotifications(key?: string): Promise<ApiNotification[]> {
  const url = key
    ? `${BASE}/api/notifications?key=${encodeURIComponent(key)}`
    : `${BASE}/api/notifications`;
  const res = await fetch(url);
  if (!res.ok) return [];
  return res.json();
}

export async function getLoginHistory(key: string, limit = 20): Promise<LoginHistoryItem[]> {
  const res = await fetch(`${BASE}/api/login-history?key=${encodeURIComponent(key)}&limit=${limit}`);
  if (!res.ok) return [];
  return res.json();
}

export async function getFreeKeyLink(): Promise<string> {
  try {
    const res = await fetch(`${BASE}/api/settings/free-key-link`);
    if (!res.ok) return '';
    const data = await res.json();
    return data.link || '';
  } catch {
    return '';
  }
}

export async function submitFeedback(payload: {
  title: string;
  content: string;
  type: string;
  rating: number;
  contact?: string;
}) {
  await new Promise(r => setTimeout(r, 1200));
  return { success: true };
}

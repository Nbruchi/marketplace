import { cookies } from 'next/headers';

// For server components
export const getServerSideCookie = async (name: string) => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
  } catch (error) {
    console.error('Error accessing server-side cookies:', error);
    return null;
  }
};

// For client components
export const getClientSideCookie = (name: string) => {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  return null;
};

// Check if we have an auth token (works in both client and server components)
export const hasAuthToken = () => {
  if (typeof window !== 'undefined') {
    // Client-side
    return !!getClientSideCookie('token');
  } else {
    // Server-side
    try {
      return !!getServerSideCookie('token');
    } catch (e) {
      return false;
    }
  }
};

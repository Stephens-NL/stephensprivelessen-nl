export function usePathname() {
  return '/test';
}

export function useRouter() {
  return {
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  };
}

export function useSearchParams() {
  return new URLSearchParams();
}

export function notFound() {
  throw new Error('Not Found');
} 
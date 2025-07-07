import '@testing-library/jest-dom';
import { Response, Request, Headers } from 'cross-fetch';

// Mock the Vite environment
process.env.VITE_API_BASE_URL = 'http://localhost:8080';

// Add required globals
global.Response = Response;
global.Request = Request;
global.Headers = Headers;

// Mock BroadcastChannel
class MockBroadcastChannel implements BroadcastChannel {
  readonly name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;

  constructor(name: string) {
    this.name = name;
  }

  postMessage(message: any): void {}
  
  addEventListener<K extends keyof BroadcastChannelEventMap>(
    type: K,
    listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {}

  removeEventListener<K extends keyof BroadcastChannelEventMap>(
    type: K,
    listener: (this: BroadcastChannel, ev: BroadcastChannelEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void {}

  dispatchEvent(event: Event): boolean {
    return true;
  }

  close(): void {}
}

global.BroadcastChannel = MockBroadcastChannel as any;

// Add TextEncoder/TextDecoder to global scope
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('util');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
  global.ArrayBuffer = ArrayBuffer;
}

// Add Jest types
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
        }
    }
}

// Polyfill TransformStream for MSW/interceptors if not available
if (typeof global.TransformStream === 'undefined') {
  try {
    // Node 18+ provides TransformStream in "stream/web"
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { TransformStream } = require('stream/web');
    // @ts-ignore: Assigning to global
    global.TransformStream = TransformStream;
  } catch {
    // Fallback: create a minimal stub
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    global.TransformStream = function () {} as any;
  }
} 
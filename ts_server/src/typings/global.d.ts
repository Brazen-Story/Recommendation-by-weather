declare namespace global {
    interface User {
      id: string;
      pw: string;
      name: string;
      phone_number: string;
    }
  
    interface Report {
      name: string;
      date: string;
      state: string;
      fashion: string;
      temperature: number;
      Additional_explanation: string;
      rain: string;
      wind: string;
    }
  
    interface AxiosResponse {
      data: {
        response: {
          body: {
            items: {
              item: any[];  // `any[]` 타입은 실제 응답의 구조를 알 수 없는 경우 사용합니다.
            };
          };
        };
      };
      status: number;
    }
  
    namespace Express {
      interface Request {
        body: {
          id?: string;
          phoneNumber?: string;
          username?: string;
          password?: string;
          weather?: string;
          selected?: string;
          temperature?: number;
          explanation?: string;
          wind?: string;
          rain?: string;
          place?: string;
        };
        params: {
          name?: string;
          temperature?: string;
          date?: string;
          wind?: string;
          findTemp?: string;
        };
        cookies: {
          accessToken?: string;
          refreshToken?: string;
        };
      }
  
      interface Response {
        json: (body: { [key: string]: any }) => Response;
        status: (code: number) => Response;
        cookie: (name: string, value: string, options?: { [key: string]: any }) => Response;
        send: (body: string) => Response;
      }
    }
  }
  
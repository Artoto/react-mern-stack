import axios from "axios";

interface UserProps {
  name?: string | undefined;
  email: string;
  phone?: string | undefined;
  role?: string | undefined;
  password?: string | undefined;
}

interface BodyProps {
  body: UserProps;
}

export class FetchData {
  public url: string;

  constructor(url: string) {
    this.url = url;
  }

  public getToken() {
    return localStorage.getItem("access_token") ?? "";
  }

  public async getAll() {
    try {
      const response = await axios.get(this.url, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data;
    } catch (error: Error | any) {
      return error?.message;
    }
  }

  public async getById(id: string) {
    try {
      const response = await axios.get(`${this.url}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data;
    } catch (error: Error | any) {
      return error?.message;
    }
  }

  public async post(body: BodyProps) {
    try {
      const response = await axios.post(this.url, body?.body, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: Error | any) {
      return error?.message;
    }
  }

  public async put(body: BodyProps, id: string | undefined) {
    try {
      const response = await axios.put(`${this.url}/${id}`, body?.body, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error: Error | any) {
      return error?.message;
    }
  }

  public async delete(id: string) {
    try {
      const response = await axios.delete(`${this.url}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data;
    } catch (error: Error | any) {
      return error?.message;
    }
  }
}

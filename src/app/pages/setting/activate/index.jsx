// Import Dependencies
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

// Local Imports
import Logo from "assets/appLogo.svg?react";
import { Button, Card, Input } from "components/ui";
import { Page } from "components/shared/Page";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// ----------------------------------------------------------------------

export default function Activate() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!data.username || !data.password) {
        toast.error("Please fill in all fields");
        return;
      }

      const response = await fetch(`${API_URL}/api/site_setting/enable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        navigate("/", { replace: true });
      } else {
        console.log(result);

        toast.error(result?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="Activate">
      <main className="min-h-100vh grid w-full grow grid-cols-1 place-items-center">
        <div className="w-full max-w-[26rem] p-4 sm:px-5">
          <div className="text-center">
            <Logo className="mx-auto size-16" />
            <div className="mt-4">
              <h2 className="dark:text-dark-100 text-2xl font-semibold text-gray-600">
                Activate
              </h2>
              <p className="dark:text-dark-300 text-gray-400">
                Enter your username and password
              </p>
            </div>
          </div>
          <Card className="mt-5 rounded-lg p-5 lg:p-7">
            <div autoComplete="off">
              <form onSubmit={onSubmit} autoComplete="off">
                <div className="space-y-4">
                  <Input
                    label="Username"
                    placeholder="Enter Username"
                    prefix={
                      <EnvelopeIcon
                        className="size-5 transition-colors duration-200"
                        strokeWidth="1"
                      />
                    }
                    value={data.username}
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />
                  <Input
                    label="Password"
                    placeholder="Enter Password"
                    type="password"
                    prefix={
                      <LockClosedIcon
                        className="size-5 transition-colors duration-200"
                        strokeWidth="1"
                      />
                    }
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>

                <Button type="submit" className="mt-5 w-full" color="primary">
                  Activate
                </Button>
              </form>
            </div>
          </Card>
          <div className="dark:text-dark-300 mt-8 flex justify-center text-xs text-gray-400">
            <a href="##">Privacy Notice</a>
            <div className="dark:bg-dark-500 mx-2.5 my-0.5 w-px bg-gray-200"></div>
            <a href="##">Term of service</a>
          </div>
        </div>
      </main>
    </Page>
  );
}

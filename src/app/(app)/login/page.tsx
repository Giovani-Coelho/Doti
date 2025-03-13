import LoginForm from "@/modules/auth/login/components/login_form";
import { AlarmClockCheckIcon } from "lucide-react";

export default function Login() {
    return (
        <main className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <AlarmClockCheckIcon className="mx-auto h-14 w-auto p-2 bg-zinc-900 stroke-white rounded-lg" />

                <h2 className="mt-4 text-start text-2xl font-bold tracking-tight text-zinc-900">
                    Login
                </h2>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <LoginForm />

                <p className="mt-10 text-center text-sm/6 text-gray-500">
                    Não tem uma conta?
                    <a
                        href="#"
                        className="ml-1 font-semibold text-zinc-700 hover:text-zinc-500"
                    >
                        Criar uma conta
                    </a>
                </p>
            </div>
        </main>
    );
}

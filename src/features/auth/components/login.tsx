import useLogin from "../hooks/use-login.hook";
import "./login.css";

export default function Login() {
  const { mutate, isPending, error } = useLogin();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return;
    }

    const normalizedEmail = email.trim();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      return;
    }

    mutate({ email: normalizedEmail, password: normalizedPassword });
  };

  if (isPending) {
    return <p>Carregando...</p>;
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <span className="login-badge">Area segura</span>

        <header className="login-header">
          <h1>Entrar na conta</h1>
          <p>
            Acesse sua area administrativa com email e senha para continuar.
          </p>
        </header>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field" htmlFor="email">
            <span>Email</span>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seuemail@empresa.com"
            />
          </label>

          <label className="login-field" htmlFor="password">
            <span>Senha</span>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
            />
          </label>

          <div className="login-row">
            <label className="login-check" htmlFor="remember">
              <input id="remember" type="checkbox" />
              <span>Lembrar de mim</span>
            </label>

            <a href="/">Esqueci a senha</a>
          </div>

          {error && (
            <p className="login-error">Erro: Favor valide seus dados</p>
          )}
          <button className="login-button" type="submit">
            Entrar
          </button>
        </form>

        <p className="login-footer">
          Ainda nao tem conta? <a href="/">Criar acesso</a>
        </p>
      </section>
    </main>
  );
}

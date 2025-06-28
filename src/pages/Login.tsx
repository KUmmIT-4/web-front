import Button from "@/components/Button";

const Login = () => {
  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex flex-col pt-48">
        <h1 className="text-blue-500 text-5xl font-bold ">하루코딩</h1>
      </div>
      <div className="flex flex-col gap-6">
        <input
          className="w-96 h-16 pl-4 rounded-lg border-1 border-solid border-slate-300
        font-bold text-slate-500"
          type="text"
          placeholder="아이디"
        />
        <Button className="bg-blue-200 rounded-lg" icon="" label="로그인" />
      </div>
    </div>
  );
};

export default Login;

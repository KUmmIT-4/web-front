import Button from "@/components/Button";
import Header from "@/components/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fetchAPI } from "@/api/test";

const ProfileEdit = () => {
  const location = useLocation();
  const { name, tier, level, language } = location.state || {};
  const navigate = useNavigate();

  const [updateTier, setUpdateTier] = useState("");
  const [updateLevel, setUpdateLevel] = useState("");
  const [updateLanguage, setUpdateLanguage] = useState("");

  const handleUpdate = () => {
    fetchAPI("patch", "/users/me", {
      body: { tier: updateTier, level: updateLevel, language: updateLanguage },
    })
      .then(() => {
        navigate("/profile");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <Header noLogo={true} title="내정보 수정" />
      <main className="px-4 py-4.5 relative">
        <div>
          <label className="block mb-2 text-start font-medium">아이디</label>
          <div className="w-full h-14 border border-[var(--disabled)] rounded-lg px-6 flex items-center text-start text-[#B1B8C0] mb-6">
            {name}
          </div>
          <label className="block mb-2 text-start font-medium">코딩 실력</label>
          <div className="flex gap-7 mb-6">
            <Select
              defaultValue={tier}
              onValueChange={(e) => {
                setUpdateTier(e);
              }}
            >
              <SelectTrigger className="flex-1 !h-13 !bg-white !border-[var(--border-line)]">
                <SelectValue placeholder="등급" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bronze">브론즈</SelectItem>
                <SelectItem value="silver">실버</SelectItem>
                <SelectItem value="gold">골드</SelectItem>
                <SelectItem value="beyond">그 이상</SelectItem>
              </SelectContent>
            </Select>
            <Select
              defaultValue={level}
              onValueChange={(e) => {
                setUpdateLevel(e);
              }}
            >
              <SelectTrigger className="flex-1 !h-13 !bg-white !border-[var(--border-line)]">
                <SelectValue placeholder="라벨" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <label className="block mb-2 text-start font-medium">코딩 언어</label>
          <Select
            defaultValue={language}
            onValueChange={(e) => {
              setUpdateLanguage(e);
            }}
          >
            <SelectTrigger className="w-full !h-13 !bg-white !border-[var(--border-line)]">
              <SelectValue placeholder="언어" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="c++">C++</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          label="다음"
          className="text-white bg-[var(--primary)] fixed bottom-13 left-4 right-4 w-auto"
          onClick={handleUpdate}
        />
      </main>
    </>
  );
};

export default ProfileEdit;

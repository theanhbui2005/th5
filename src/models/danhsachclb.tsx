import { useState } from "react";
type ClubRecord = Club.Record;

const useClubModel = () => {
  const [clubs, setClubs] = useState<ClubRecord[]>(() => {
    return JSON.parse(localStorage.getItem("clubs") || "[]");
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedClub, setSelectedClub] = useState<ClubRecord | null>(null);

  // Thêm mới CLB
  const addClub = (club: Omit<ClubRecord, "id">) => {
    // Kiểm tra trùng tên câu lạc bộ
    if (clubs.some((c) => c.clubName.trim().toLowerCase() === club.clubName.trim().toLowerCase())) {
      alert("Tên câu lạc bộ đã tồn tại!");
      return;
    }
    const newClub: ClubRecord = { id: Date.now(), ...club };
    const newClubs = [...clubs, newClub];
    localStorage.setItem("clubs", JSON.stringify(newClubs));
    setClubs(newClubs);
  };

  // Cập nhật thông tin CLB
  const updateClub = (updatedClub: ClubRecord) => {
    // Kiểm tra trùng tên với các CLB khác
    if (clubs.some((c) => c.clubName.trim().toLowerCase() === updatedClub.clubName.trim().toLowerCase() && c.id !== updatedClub.id)) {
      alert("Tên câu lạc bộ đã tồn tại!");
      return;
    }
    const newClubs = clubs.map((c) => (c.id === updatedClub.id ? updatedClub : c));
    localStorage.setItem("clubs", JSON.stringify(newClubs));
    setClubs(newClubs);
  };

  // Xóa CLB (có thể bổ sung thêm ràng buộc nếu cần)
  const deleteClub = (clubId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa câu lạc bộ này?")) {
      const newClubs = clubs.filter((c) => c.id !== clubId);
      localStorage.setItem("clubs", JSON.stringify(newClubs));
      setClubs(newClubs);
    }
  };

  return {
    clubs,
    setClubs,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedClub,
    setSelectedClub,
    addClub,
    updateClub,
    deleteClub,
  };
};

export default useClubModel;

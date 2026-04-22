// 📁 src/components/Navbar/Navbar.tsx
// 역할: 상단 고정 네비게이션 바 컴포넌트
//       로고, 탭 메뉴, 검색 아이콘, 모바일 햄버거 메뉴를 포함
//       NavbarProps 타입으로 activeTab·onTabChange의 형태를 명시적으로 강제
//       추후 로그인 상태에 따른 사용자 아이콘, 알림 기능 연결 예정

import React, { useState, useEffect } from "react";
import type { NavbarProps, NavTab, TabId } from "../../types";
import "./Navbar.css";

// 탭 메뉴 정의 데이터 - NavTab[] 타입으로 구조 보장
// 추후 라우터 path 연결 시 이 배열에 path 필드 추가
const NAV_TABS: NavTab[] = [
  { id: "home", label: "홈" },
  { id: "restaurants", label: "맛집 탐색" },
  { id: "liked", label: "좋아요 기록" },
];

function Navbar({ activeTab, onTabChange }: NavbarProps): JSX.Element {
  // 모바일 메뉴 열림/닫힘 상태
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  // 스크롤 시 네브바에 그림자 추가 여부
  const [scrolled, setScrolled] = useState<boolean>(false);

  // 스크롤 이벤트 감지 - 스크롤 시 네브바 스타일 변경
  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거 (메모리 누수 방지)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 탭 클릭 핸들러 - TabId 타입으로 매개변수를 제한하여 오탈자 방지
  const handleTabClick = (tabId: TabId): void => {
    onTabChange(tabId);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        {/* 로고 영역 - 클릭 시 홈으로 이동 */}
        <button className="navbar__logo" onClick={() => handleTabClick("home")}>
          <span className="navbar__logo-icon">🍽</span>
          <span className="navbar__logo-text">맛지도</span>
        </button>

        {/* 데스크톱 탭 메뉴 */}
        <nav className="navbar__tabs">
          {NAV_TABS.map((tab: NavTab) => (
            <button
              key={tab.id}
              className={`navbar__tab ${activeTab === tab.id ? "navbar__tab--active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 우측 액션 버튼 영역 */}
        <div className="navbar__actions">
          {/* 검색 아이콘 버튼 - 추후 검색 모달 또는 검색 페이지 연결 예정 */}
          <button className="navbar__icon-btn" aria-label="검색">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* 리뷰 작성 버튼 - 추후 리뷰 작성 모달/페이지 연결 예정 */}
          <button className="navbar__review-btn btn-primary">
            + 리뷰 쓰기
          </button>

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="메뉴 열기"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 - menuOpen 상태에 따라 표시/숨김 */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}
      >
        {NAV_TABS.map((tab: NavTab) => (
          <button
            key={tab.id}
            className={`navbar__mobile-tab ${
              activeTab === tab.id ? "navbar__mobile-tab--active" : ""
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}

export default Navbar;

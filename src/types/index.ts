// 📁 src/types/index.ts
// 역할: 앱 전체에서 공유하는 TypeScript 타입 및 인터페이스 정의
//       Spring API 응답 DTO 구조와 1:1 대응되도록 설계
//       백엔드 연동 시 이 파일의 타입을 기준으로 API 응답을 검증할 예정

// ─────────────────────────────────────────
// 네비게이션 관련 타입
// ─────────────────────────────────────────

// 탭 ID를 문자열 리터럴 유니온으로 제한 - 잘못된 탭 ID 사용을 컴파일 타임에 방지
export type TabId = "home" | "restaurants" | "liked";

// 개별 탭 메뉴 항목 데이터 구조
export interface NavTab {
  id: TabId;
  label: string;
}

// ─────────────────────────────────────────
// 카테고리 관련 타입
// ─────────────────────────────────────────

// 음식 카테고리 문자열 리터럴 유니온 - 필터, 뱃지 등에 재사용
export type FoodCategory = "한식" | "일식" | "중식" | "양식" | "카페" | "분식" | "전체";

// 배너 카테고리 버튼 데이터 구조
export interface CategoryItem {
  id: string;
  emoji: string;
  label: FoodCategory;
}

// ─────────────────────────────────────────
// 맛집(Restaurant) 관련 타입
// ─────────────────────────────────────────

// 가격대 표시 리터럴 유니온
export type PriceRange = "₩" | "₩₩" | "₩₩₩" | "₩₩₩₩";

// 맛집 데이터 구조 - Spring API: GET /api/restaurants 응답 단일 항목과 동일
export interface Restaurant {
  id: number;
  name: string;
  // FoodCategory에서 "전체"는 필터 전용이므로 제외
  category: Exclude<FoodCategory, "전체">;
  rating: number;          // 0.0 ~ 5.0
  reviewCount: number;
  location: string;
  distance: string;        // 예: "0.3km"
  tags: string[];
  priceRange: PriceRange;
  imageUrl: string;        // 추후 CDN/S3 URL로 교체
  isLiked: boolean;
  isNew: boolean;
  isTrending: boolean;
}

// ─────────────────────────────────────────
// 리뷰(Review) 관련 타입
// ─────────────────────────────────────────

// 리뷰 데이터 구조 - Spring API: GET /api/reviews/latest 응답 단일 항목과 동일
export interface Review {
  id: number;
  restaurantId: number;
  restaurantName: string;
  restaurantCategory: Exclude<FoodCategory, "전체">;
  userNickname: string;
  userAvatar: string;      // 이니셜 1~2자 (추후 프로필 이미지 URL로 교체)
  rating: number;          // 1 ~ 5 정수
  content: string;
  imageUrl: string;
  createdAt: string;       // ISO 날짜 문자열 "YYYY-MM-DD"
  likeCount: number;
}

// ─────────────────────────────────────────
// 정렬 관련 타입
// ─────────────────────────────────────────

// 정렬 기준값 리터럴 유니온 - API 쿼리 파라미터로 전달될 값
export type SortKey = "rating" | "reviewCount" | "distance";

// 정렬 옵션 드롭다운 항목 데이터 구조
export interface SortOption {
  value: SortKey;
  label: string;
}

// ─────────────────────────────────────────
// 컴포넌트 Props 타입
// ─────────────────────────────────────────

// Navbar 컴포넌트 Props
export interface NavbarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

// RestaurantCard 컴포넌트 Props
export interface RestaurantCardProps {
  restaurant: Restaurant;
  onLikeToggle: (id: number) => void;
}

// RestaurantList 컴포넌트 Props
export interface RestaurantListProps {
  // 전체 목록 페이지 여부 (false: 메인 홈 최대 6개, true: 전체 표시)
  showAll?: boolean;
}

// ReviewCard 컴포넌트 Props
export interface ReviewCardProps {
  review: Review;
}

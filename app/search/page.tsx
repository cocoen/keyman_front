//"use client";

//import React, { useState } from "react";
import { ArrowLeft, Search, Briefcase, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios"; // axios import 추가

interface SearchResult {
	id: string;
	name: string;
	position: string;
	skills: string[];
	experience: number;
	department: string;
	projects: string[];
	profileImage?: string;
	highlights: string[];
	availability: "available" | "busy" | "unavailable";
	//explain: string;
}



interface SearchPageProps {
	searchParams: {
		query?: string;
		view?: string;
	}
}

// const MOCK_RESULTS: SearchResult[] = [
// 	{
// 		id: "1",
// 		name: "김개발",
// 		position: "시니어 백엔드 개발자", 
// 		skills: ["Java", "Spring Boot", "MSA", "Kubernetes"],
// 		experience: 7,
// 		department: "플랫폼개발팀",
// 		projects: ["대규모 커머스 플랫폼 개발", "결제 시스템 MSA 전환"],
// 		highlights: ["AWS 인증 전문가", "마이크로서비스 설계 전문가"],
// 		availability: "available",
// 		profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
// 	},
// 	{
// 		id: "2", 
// 		name: "이프론트",
// 		position: "프론트엔드 개발자",
// 		skills: ["React", "TypeScript", "Next.js", "Tailwind"],
// 		experience: 4,
// 		department: "웹서비스개발팀",
// 		projects: ["반응형 웹 애플리케이션 개발", "디자인 시스템 구축"],
// 		highlights: ["웹 성능 최적화 전문가", "모던 프론트엔드 아키텍처"],
// 		availability: "busy",
// 		profileImage: "https://randomuser.me/api/portraits/women/2.jpg",
// 	},
// 	{
// 		id: "3",
// 		name: "박데이터",
// 		position: "데이터 사이언티스트",
// 		skills: ["Python", "TensorFlow", "PyTorch", "SQL"],
// 		experience: 5,
// 		department: "AI연구소",
// 		projects: ["고객 행동 예측 모델 개발", "이상 거래 탐지 시스템 구축"],
// 		highlights: ["머신러닝 알고리즘 전문가", "빅데이터 분석"],
// 		availability: "unavailable",
// 		profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
// 	},
// 	{
// 		id: "4",
// 		name: "최클라우드",
// 		position: "데브옵스 엔지니어",
// 		skills: ["AWS", "Docker", "Terraform", "Jenkins"],
// 		experience: 6,
// 		department: "인프라운영팀",
// 		projects: ["클라우드 마이그레이션", "CI/CD 파이프라인 구축"],
// 		highlights: ["클라우드 아키텍처 전문가", "자동화 파이프라인 구축"],
// 		availability: "available",
// 		profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
// 	},
// 	{
// 		id: "5",
// 		name: "정보안",
// 		position: "보안 엔지니어",
// 		skills: ["Security+", "CISSP", "Penetration Testing", "Network Security"],
// 		experience: 8,
// 		department: "정보보안팀",
// 		projects: ["보안 취약점 분석", "침투 테스트 수행"],
// 		highlights: ["정보보안 전문가", "보안 아키텍처 설계"],
// 		availability: "busy",
// 		profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
// 	},
// 	{
// 		id: "6",
// 		name: "한모바일",
// 		position: "모바일 개발자",
// 		skills: ["Swift", "Kotlin", "React Native", "Flutter"],
// 		experience: 5,
// 		department: "모바일개발팀",
// 		projects: ["하이브리드 앱 개발", "네이티브 앱 성능 최적화"],
// 		highlights: ["크로스 플랫폼 개발 전문가", "모바일 UI/UX"],
// 		availability: "available",
// 		profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
// 	},
// 	{
// 		id: "7",
// 		name: "송풀스택",
// 		position: "풀스택 개발자",
// 		skills: ["Node.js", "React", "MongoDB", "Express"],
// 		experience: 6,
// 		department: "서비스개발팀",
// 		projects: ["실시간 채팅 서비스 개발", "SNS 플랫폼 구축"],
// 		highlights: ["웹 서비스 아키텍처", "실시간 데이터 처리"],
// 		availability: "busy",
// 		profileImage: "https://randomuser.me/api/portraits/women/7.jpg",
// 	},
// 	{
// 		id: "8",
// 		name: "강블록체인",
// 		position: "블록체인 개발자",
// 		skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
// 		experience: 4,
// 		department: "블록체인연구소",
// 		projects: ["스마트 컨트랙트 개발", "DApp 서비스 구축"],
// 		highlights: ["블록체인 아키텍처", "암호화폐 시스템"],
// 		availability: "unavailable",
// 		profileImage: "https://randomuser.me/api/portraits/men/8.jpg",
// 	},
// 	{
// 		id: "9",
// 		name: "윤품질",
// 		position: "QA 엔지니어",
// 		skills: ["Selenium", "JUnit", "TestNG", "Cucumber"],
// 		experience: 5,
// 		department: "품질관리팀",
// 		projects: ["자동화 테스트 프레임워크 구축", "성능 테스트 수행"],
// 		highlights: ["테스트 자동화", "품질 프로세스 개선"],
// 		availability: "available",
// 		profileImage: "https://randomuser.me/api/portraits/women/9.jpg",
// 	},
// 	{
// 		id: "10",
// 		name: "임UI",
// 		position: "UI/UX 디자이너",
// 		skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
// 		experience: 4,
// 		department: "디자인팀",
// 		projects: ["사용자 경험 개선", "디자인 시스템 구축"],
// 		highlights: ["사용자 중심 디자인", "디자인 시스템"],
// 		availability: "busy",
// 		profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
// 	},
// ];


type SearchPromptType =
  | "해커톤 담당자 검색"
  | "모바일 로봇 S/W 설계"
  | "해상풍력 강재와 구조 설계";

const PROMPT_EXAMPLES: Record<SearchPromptType, string> = {
	"해커톤 담당자 검색":
	  "포스코그룹 WX 해커톤 대회에서 임직원 검색 솔루션(키맨)을 개발한 담당자를 찾아줘",
	"모바일 로봇 S/W 설계":
	  "포스코DX에서 컴퓨터공학 전공과 관련된 석사, 박사 중 모바일 로봇 소프트웨어(S/W) 설계 경험이 있는 사람 찾아줘",
	"해상풍력 강재와 구조 설계":
	  "해상풍력용 강재를 담당하는 포스코 연구원과 해상풍력 구조 설계를 담당하는 포스코이앤씨 리더를 검색해줘",
  };
  


export default async function SearchResultsPage({
	searchParams,
}: SearchPageProps) {
	//const [searchResults, setSearchResults] = useState([]);

	// const handleSearch = async () => {
	// 	try {
	// 		const response = await axios.post("http://127.0.0.1:8000/search", { query });
	// 		console.log("Search results:", response.data);
	// 		setSearchResults(response.data.results);
	// 		//print(query);
	// 	} catch (error) {
	// 		console.error("Error executing search:", error);
	// 	}
	// };


	// 유저쿼리
	const query = searchParams.query || "";
	const selectedView = (searchParams.view as "card" | "list") || "card";

	//handleSearch();


	const response = await axios.post("http://127.0.0.1:8000/search", {
		query, // 요청 데이터
	});

	if (query == "") {

	};

	let searchResults = response.data.results as SearchResult[]; // API에서 반환된 `results` 배열;
	let results =searchResults;
	
	if (query === PROMPT_EXAMPLES["해커톤 담당자 검색"]) {
		// 1번 쿼리: 5번째 index까지
		results = searchResults.slice(0, 5);
	  } else if (query === PROMPT_EXAMPLES["모바일 로봇 S/W 설계"]) {
		// 2번 쿼리: 2번째 index까지
		results = searchResults.slice(0, 2);
	  } else if (query === PROMPT_EXAMPLES["해상풍력 강재와 구조 설계"]) {
		// 3번 쿼리: 모든 결과 사용 (예시: 전체 결과 사용)
		results = searchResults.slice(0, 3); // 3번째 index까지
	  } else {
		// 기본 동작: 전체 결과 반환
		//const results = searchResults;
	  }
	


	//const results = MOCK_RESULTS;

	

	function getAvailabilityInfo(availability: SearchResult["availability"]) {
		switch (availability) {
			case "available":
				return {
					text: "협업 가능",
					color: "bg-green-500/20",
					dotColor: "bg-green-500/50",
					textColor: "text-green-300",
				};
			case "busy":
				return {
					text: "진행중",
					color: "bg-yellow-500/20",
					dotColor: "bg-yellow-500/50",
					textColor: "text-yellow-300",
				};
			case "unavailable":
				return {
					text: "협업 불가",
					color: "bg-red-500/20",
					dotColor: "bg-red-500/50",
					textColor: "text-red-300",
				};
			default:
				return {
					text: "",
					color: "",
					dotColor: "",
					textColor: "",
				};
		}
	}

	return (
		<div className="min-h-screen bg-[#212121] text-white">
			<nav className="sticky top-0 z-10 bg-[#212121]/90 border-b border-[#2A2A2A] px-3 py-2">
				<div className="max-w-4xl mx-auto flex items-center justify-between">
					<Link href="/" className="flex items-center text-[#A8A8A8] hover:text-white">
						<ArrowLeft className="w-4 h-4 mr-1" />
						<span className="text-xs">메인으로</span>
					</Link>
					<div className="flex items-center space-x-2">
						<div className="flex bg-[#2A2A2A] rounded-lg p-0.5">
							<Link
								href={`/search?view=card&query=${query}`}
								className={`px-2 py-1 rounded-md text-xs ${
									selectedView === "card" ? "bg-[#363636]" : ""
								}`}
							>
								카드뷰
							</Link>
							<Link
								href={`/search?view=list&query=${query}`}
								className={`px-2 py-1 rounded-md text-xs ${
									selectedView === "list" ? "bg-[#363636]" : ""
								}`}
							>
								리스트뷰
							</Link>
						</div>
					</div>
				</div>
			</nav>

			<main className="max-w-4xl mx-auto px-3 py-3">
				<form
					
					className="mb-4"
				>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-2 flex items-center">
							<Search className="w-3.5 h-3.5 text-[#A8A8A8]" />
						</div>
						<input
							type="text"
							name="query"
							defaultValue={query}
							placeholder="필요한 인재의 조건을 입력해 주세요"
							className="w-full pl-7 pr-2 py-1.5 bg-[#2A2A2A] border border-[#363636] rounded-lg
                text-xs placeholder-[#A8A8A8] focus:outline-none focus:border-[#454545]"
						/>
					</div>
				</form>

				<div className="flex items-center justify-between mb-3">
					<h1 className="text-sm font-medium">
						검색 결과 <span className="text-[#A8A8A8]">({results.length}명)</span>
					</h1>
					<select className="bg-[#2A2A2A] border border-[#363636] rounded-lg px-2 py-1 text-xs">
						<option>최신순</option>
						<option>경력순</option>
						<option>이름순</option>
					</select>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
					{results.map((result) => (
						<div
							key={result.id}
							className="group bg-[#2A2A2A] border border-[#363636] rounded-2xl p-3 
                hover:bg-[#363636]"
						>
							<div className="flex items-start space-x-3">
								{result.profileImage ? (
									<Image
										src={result.profileImage}
										alt={result.name}
										width={40}
										height={40}
										className="rounded-full object-cover w-10 h-10"
									/>
								) : (
									<div className="w-10 h-10 rounded-full bg-[#363636] flex items-center justify-center text-sm font-medium">
										{result.name.slice(0, 1)}
									</div>
								)}
								<div className="flex-1">
									<div className="flex items-start justify-between mb-2">
										<div>
											<h3 className="text-sm font-medium">{result.name}</h3>
											<div className="flex items-center space-x-1.5 mt-0.5">
												<Building className="w-3 h-3 text-[#A8A8A8]" />
												<p className="text-xs text-[#A8A8A8]">{result.department}</p>
											</div>
											<div className="flex items-center space-x-1.5 mt-0.5">
												<Briefcase className="w-3 h-3 text-[#A8A8A8]" />
												<p className="text-xs text-[#A8A8A8]">{result.position}</p>
											</div>
											<div className="flex items-center space-x-1.5 mt-0.5">
												<div
													className={`w-1.5 h-1.5 rounded-full ${
														getAvailabilityInfo(result.availability).dotColor
													}`}
												/>
												<p
													className={`text-xs ${
														getAvailabilityInfo(result.availability).textColor
													}`}
												>
													{getAvailabilityInfo(result.availability).text}
												</p>
											</div>
										</div>
										<span
											className={`px-1.5 py-0.5 rounded text-[10px] ${
												result.availability === "available"
													? "bg-green-900/10 text-green-300/90"
													: result.availability === "busy"
													? "bg-yellow-900/10 text-yellow-300/90"
													: "bg-red-900/10 text-red-300/90"
											}`}
										>
											{result.experience}년차
										</span>
									</div>

									<div className="space-y-2">
										<div>
											<p className="text-[10px] font-medium mb-1">주요 강점</p>
											<div className="flex flex-wrap gap-1">
												{result.highlights.map((highlight) => (
													<span
														key={highlight}
														className="flex items-center space-x-1 bg-[#363636] px-1.5 py-0.5 rounded text-[10px]"
													>
														<span>{highlight}</span>
													</span>
												))}
											</div>
										</div>

										<div>
											<p className="text-[10px] font-medium mb-1">보유 스킬</p>
											<div className="flex flex-wrap gap-1">
												{result.skills.map((skill) => (
													<span
														key={skill}
														className="bg-[#363636] px-1.5 py-0.5 rounded text-[10px]"
													>
														{skill}
													</span>
												))}
											</div>
										</div>

										<div>
											<p className="text-[10px] font-medium mb-1">주요 프로젝트</p>
											<ul className="space-y-0.5 text-[10px] text-[#A8A8A8]">
												{result.projects.map((project) => (
													<li key={project} className="flex items-center space-x-1">
														<span className="w-0.5 h-0.5 rounded-full bg-[#454545]" />
														<span>{project}</span>
													</li>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { auth } from "./lib/auth";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "POSCO Keyman | 포스코그룹 인재 검색",
	description: "포스코그룹의 인재를 검색하고 프로젝트 팀을 구성하세요. AI 기반 인재 매칭 시스템으로 최적의 팀원을 찾아보세요.",
	keywords: ["포스코", "인재검색", "프로젝트", "팀빌딩", "AI매칭", "인재관리"],
	authors: [{ name: "POSCO Holdings" }],
	creator: "POSCO Holdings",
	publisher: "POSCO Holdings",
	formatDetection: {
		telephone: false,
		email: false,
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
	},
	themeColor: "#212121",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<div className="flex">
					<Sidebar session={session} />
					<main className="flex-1 h-screen overflow-y-auto">{children}</main>
				</div>
			</body>
		</html>
	);
}

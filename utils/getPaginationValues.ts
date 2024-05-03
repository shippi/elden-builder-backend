import { NextRequest } from "next/server";

export function getPaginationValues(req: NextRequest) {
    const page = Number(req.nextUrl.searchParams.get("page")) ? Number(req.nextUrl.searchParams.get("page")) : 1;
    
    const limit = !Number(req.nextUrl.searchParams.get("limit")) ? 10 : Number(req.nextUrl.searchParams.get("limit")) > 50 ? 50 : Number(req.nextUrl.searchParams.get("limit"));


    console.log(limit)
    const startIndex = (page - 1) * limit;

    return {startIndex, limit}
}
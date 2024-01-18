import type { NextApiRequest, NextApiResponse } from "next";
import { transactions } from "@/pages/api/data/transactions";
import { findInObjects } from "@/utils/findInObjects";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>,
) {
  const { search } = req.query;

  let dropdownList: string[] = [];

  if (search) {
    const matchingObjects = findInObjects(
      transactions,
      search as string,
      "description",
    );
    dropdownList = matchingObjects.map((item) => item.description);
  }

  res.status(200).send(dropdownList);
}

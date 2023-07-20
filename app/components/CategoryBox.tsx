"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

//adding alias Icon in icon allows us to use it as a component in return
const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams(); //hooks

  const handleClick = useCallback(() => {
    let currentQuery = {}; //define an empty query

    //check if we have params at all bc params can be a type of nulls
    if (params) {
      currentQuery = qs.parse(params.toString()); //create an object out of all current parameters. We will have many params and store things in URL, search location, # of rooms, guest and timeframe of stay.
    }

    //spread query and add new category in
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };
    if (params?.get("category") === label) {
      delete updatedQuery.category; //check if new query is already selected and remove it from updated query. Deselected
    }
    const url = qs.stringifyUrl(
      {
        //generate url and pass in path name and query
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
          flex  
          flex-col
          items-center
          justify-center
          gap-2
          p-3
          border-b-2
          hover:text-neutral-800
          transition
          cursor-pointer 
          ${selected ? "border-b-neutral-800" : "border-transparent"}
          ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon className="overflow-x-auto" size={26} />
      <div className="font-medium text-sm">{label}</div>{" "}
      {/* onclick events to load new listing. This happens by assigning URL parameters.*/}
    </div>
  );
};

//selected to add optional ones,

export default CategoryBox;

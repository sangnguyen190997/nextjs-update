// import { sortProductSectionVar } from '../apollo/client/cache';
// import { useQuery } from '@apollo/client';
// import { SORT_PRODUCT_SECTION } from '../apollo/client/queries';

export default function HeaderBarProducts({ handleShort }) {
  const changeValue = (e) => {
    const value = e.target.value;
    console.log(value);
    // handleShort(value);
  };
  return (
    <div className="flex justify-between">
      <div className="w-2/5">
        <input
          placeholder="Enter Search Here!"
          type="text"
          id="default-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div>
        <select
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={changeValue}
        >
          <option value="default">Default sorting</option>
          <option value="DownToUp">Price: Low to High</option>
          <option value="UpToDown">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

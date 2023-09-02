import { format } from 'date-fns';
export const DatePicker = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex flex-col xs:flex-row my-5">
                <div className="flex">
                    <label htmlFor="start-date" className="font-bold">
                        Start:
                    </label>
                    <input type="date" name="start-date" id="start-date" className="w-full rounded border p-2" />
                </div>

                <div className="flex">
                    <label htmlFor="end-date" className="font-bold">
                        End:
                    </label>
                    <input
                        type="date"
                        name="end-date"
                        id="end-date"
                        value={`${format(Date.now(), 'Y-MM-dd')}`}
                        max={`${format(Date.now(), 'Y-MM-dd')}`}
                        className="w-full rounded border p-2"
                    />
                </div>
            </div>
            <div className="flex justify-center w-full my-2">
                <input
                    id="add-button"
                    type="submit"
                    value="Add"
                    className="px-4 py-2  bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                />
            </div>
        </div>
    );
};

import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthProvider";
import ProductOrderModal from "../../CategoryProducts/ProductOrderModal/ProductOrderModal";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import sortImg from "../../../assets/image/sort.png";
import ProductGridView from "../../CategoryProducts/CategoryProducts/ProductGridView";
import ProductListView from "../../CategoryProducts/CategoryProducts/ProductListView";

const Advertisement = () => {
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [productView, setProductView] = useState(null);
  const [isAsc, setIsAsc] = useState("");

  const { data: advertisement = [], isLoading } = useQuery({
    queryKey: ["advertisement"],
    queryFn: async () => {
      const res = await fetch(
        `https://used-products-resale-server.vercel.app/advertisement?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if (isAsc === "Low Price") {
    advertisement.sort(function (a, b) {
      return a.resalePrice - b.resalePrice;
    });
  }
  if (isAsc === "High Price") {
    advertisement.sort(function (a, b) {
      return b.resalePrice - a.resalePrice;
    });
  }

  return (
    <div className="my-20 bg-white">
      {advertisement.length > 0 && (
        <div className="px-10">
          <div className="">
            <h2 className="text-2xl text-center font-bold text-slate-700 mb-10">
              Advertisement Phones
            </h2>

            <div className="mb-5 flex items-center gap-2">
              <select
                onChange={(e) => setIsAsc(e.target.value)}
                className="select select-bordered select-sm w-56 focus:outline-none"
              >
                <option disabled selected>
                  -- Price --
                </option>
                <option>Low Price</option>
                <option>High Price</option>
              </select>

              <BsFillGrid3X3GapFill
                onClick={() => setProductView(true)}
                className="h-5 w-5 inline-block cursor-pointer"
              />
              <FaListUl
                onClick={() => setProductView(false)}
                className="w-5 h-5 inline-block cursor-pointer"
              />
            </div>
          </div>

          <div>
            {productView ? (
              <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-10">
                {advertisement.map((product) => (
                  <ProductGridView
                    setProduct={setProduct}
                    key={product._id}
                    product={product}
                  ></ProductGridView>
                ))}
              </div>
            ) : (
              <div>
                {advertisement.map((product) => (
                  <ProductListView
                    setProduct={setProduct}
                    key={product._id}
                    product={product}
                  ></ProductListView>
                ))}
              </div>
            )}
          </div>

          <div>
            {product && (
              <ProductOrderModal
                product={product}
                setProduct={setProduct}
              ></ProductOrderModal>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertisement;

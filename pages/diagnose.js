import { useState } from "react";
import SelectInput from "@/components/selectInput";
import NumberInput from "@/components/numberInput";
import { genderOptions } from "@/constants/gender";
import { familyHistoryOptions } from "@/constants/familyHistory";
import { exerciseOptions } from "@/constants/exercise";
import { pregnancyOptions } from "@/constants/pregnancy";
import { smokingOptions } from "@/constants/smoking";
import { sleepPatternOptions } from "@/constants/sleepPattern";

export default function Diagnose() {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState(0);
  const [familyHistory, setFamilyHistory] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [bloodPressure, setBloodPressure] = useState(0);
  const [bloodSugar, setBloodSugar] = useState(0);
  const [pregnancy, setPregnancy] = useState(0);
  const [smoking, setSmoking] = useState(0);
  const [exercise, setExercise] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const [prediction, setPrediction] = useState(null);

  const diagnoseDiabetes = () => {
    setIsLoading(true); // Menampilkan overlay loading sebelum permintaan fetch

    fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Usia: age,
        Jenis_Kelamin: gender,
        Riwayat_Keluarga: familyHistory,
        BMI: bmi,
        Tekanan_Darah: bloodPressure,
        Gula_Darah: bloodSugar,
        Kehamilan: pregnancy,
        Kebiasaan_Merokok: smoking,
        Aktifitas_Fisik: exercise,
        Pola_Tidur: sleep,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrediction(data.prediction);
        setIsLoading(false); // Menyembunyikan overlay loading setelah mendapatkan respons
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false); // Jika terjadi kesalahan, juga sembunyikan overlay loading
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">Diagnosa Diabetes</h1>
        <p className="text-sm text-center text-zinc-600 mb-4">
          Masukkan data yang digunakan untuk diagnosa di bawah ini
        </p>
        <form className="w-96">
          <NumberInput
            label="Usia"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={0}
            max={100}
          />

          <SelectInput
            label="Jenis Kelamin"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            options={genderOptions}
          />
          <SelectInput
            label="Riwayat Keluarga Pengidap Diabetes"
            id="familyHistory"
            value={familyHistory}
            onChange={(e) => setFamilyHistory(e.target.value)}
            options={familyHistoryOptions}
          />

          <NumberInput
            label="Body Mass Index"
            id="bmi"
            value={bmi}
            onChange={(e) => setBmi(e.target.value)}
            min={0}
          />

          <SelectInput
            label="Tekanan Darah"
            id="bloodPressure"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            options={familyHistoryOptions}
          />

          <NumberInput
            label="Gula Darah"
            id="bloodSugar"
            value={bloodSugar}
            onChange={(e) => setBloodSugar(e.target.value)}
            min={0}
            max={600}
          />

          <SelectInput
            label="Kehamilan"
            id="pregnancy"
            value={pregnancy}
            onChange={(e) => setPregnancy(e.target.value)}
            options={pregnancyOptions}
          />
          <SelectInput
            label="Merokok"
            id="smooking"
            value={smoking}
            onChange={(e) => setSmoking(e.target.value)}
            options={smokingOptions}
          />
          <SelectInput
            label="Aktivitas Fisik"
            id="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            options={exerciseOptions}
          />
          <SelectInput
            label="Pola Tidur"
            id="sleepPattern"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            options={sleepPatternOptions}
          />

          <input
            type="button"
            onClick={diagnoseDiabetes}
            value="Diagnosa"
            className="border-2 bg-teal-500 w-full p-1 text-white font-semibold rounded hover:bg-teal-600"
          />
        </form>

        {prediction === 0 ? (
          <p className="text-black text-4xl mt-4 font-semibold">
            Anda Tidak Terkena Diabetes
          </p>
        ) : prediction === 1 ? (
          <p className="text-red-500 text-4xl mt-4 font-semibold">
            Anda Terindikasi Terkena Diabetes
          </p>
        ) : (
          ""
        )}
        {/* Overlay Loading */}
        {isLoading && (
          <div className="overlay">
            <div className="loader"></div>
          </div>
        )}
      </div>
    </>
  );
}

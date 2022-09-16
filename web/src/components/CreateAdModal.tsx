import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import { Label } from "./Form/Label";
import { Game } from "../App";
import { FormEvent, useState } from "react";
import axios from "axios";

interface CreateAdModalProps {
    games: Game[]
}

export function CreateAdModal(props: CreateAdModalProps) {

    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

    function setStyleIfWeekDayChecked(currentDay: string) {
        return weekDays.includes(currentDay) ? "bg-violet-500" : "bg-zinc-900";
    }

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement);

        const data = Object.fromEntries(formData);

        console.log(data);

        if (!data.name) return;
        try {
            await axios.post(`http://localhost:3333/games/${data.gameId}/ads`, {
                "name": data.name,
                "yearsPlaying": Number(data.yearsPlaying),
                "discord": data.discord,
                "hourStart": data.hourStart,
                "hourEnd": data.hourEnd,
                "weekDays": weekDays,
                "useVoiceChannel": useVoiceChannel
            });

            alert("Criado com sucesso")
        } catch (error) {
            alert("Deu ruim! Olha o log!")
            console.log(error);
        }


    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

            <Dialog.Content className="fixed bg-[#2A2634] py-7 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
                <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>
                <Dialog.Description>
                    <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="game" className="font-semibold" text="Qual o Game?" />
                            {/* <Input id="game" placeholder="Selecione o game que deseja jogar" /> */}

                            <select id="game" name="gameId"
                                defaultValue=""
                                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                            >
                                <option value="">Selecione o game que deseja jogar</option>

                                {props.games.map(game => (<option value={game.id} key={game.id}>{game.title}</option>))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="nick" className="font-semibold" text="Seu nome (ou nickname)" />
                            <Input id="name" name="name" placeholder="Digite o seu nick" />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="yearsPlaying" className="font-semibold" text="Joga há quantos anos?" />
                                <Input type="number" name="yearsPlaying" id="yearsPlaying" placeholder="Tudo bem ser ZER0" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="discord" className="font-semibold" text="Qual seu Discord?" />
                                <Input id="discord" name="discord" placeholder="Usuário#0000" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="weerDays" className="font-semibold" text="Quando costuma jogar?" />

                            <ToggleGroup.Root type="multiple"
                                className="grid grid-cols-7 gap-2"
                                onValueChange={setWeekDays}
                                value={weekDays}
                            >
                                <ToggleGroup.Item className={`w-11 h-11 rounded ${setStyleIfWeekDayChecked('0')}`} value="0" title="Domingo">D</ToggleGroup.Item>
                                <ToggleGroup.Item className={`w-11 h-11 rounded ${setStyleIfWeekDayChecked('1')}`} value="1" title="Segunda">S</ToggleGroup.Item>
                                <ToggleGroup.Item className={`w-11 h-11 rounded ${setStyleIfWeekDayChecked('2')}`} value="2" title="Terça">T</ToggleGroup.Item>
                                <ToggleGroup.Item className={`w-11 h-11 rounded ${setStyleIfWeekDayChecked('3')}`} value="3" title="Quarta">Q</ToggleGroup.Item>
                                <ToggleGroup.Item className={`w-11 h-11 rounded ${setStyleIfWeekDayChecked('4')}`} value="4" title="Quinta">Q</ToggleGroup.Item>
                                <ToggleGroup.Item className={`w-11 h-11 rounded ${setStyleIfWeekDayChecked('5')}`} value="5" title="Sexta">S</ToggleGroup.Item>
                                <ToggleGroup.Item className={`w-11 h-11 rounded ${setStyleIfWeekDayChecked('6')}`} value="6" title="Sábado">S</ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>

                        <div className="flex gap-6">

                        </div>

                        <div className="flex gap-6">

                            <div className="flex flex-col gap-2 flex-1">
                                <Label htmlFor="hourStar" className="font-semibold" text="Qual horário do dia?" />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input type="time" name="hourStart" id="hourStart" placeholder="De" />
                                    <Input type="time" name="hourEnd" id="hourEnd" placeholder="Até" />
                                </div>
                            </div>
                        </div>

                        <label className="mt-2 items-center flex gap-2 text-sm">
                            <Checkbox.Root
                                checked={useVoiceChannel}
                                onCheckedChange={(checked) => setUseVoiceChannel(checked === true)}
                                className="w-6 h-6 p-1 rounded bg-zinc-900">
                                <Checkbox.Indicator className="" >
                                    <Check className="w-4 h-4 text-emerald-400" />
                                </Checkbox.Indicator>

                            </Checkbox.Root>
                            Costumo me conectar ao chat de voz
                        </label>

                        <footer className="mt-4 flex justify-end gap-4">
                            <Dialog.Close type="button"
                                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                            >
                                Cancelar
                            </Dialog.Close>
                            <button type="submit"
                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            >
                                <GameController className="w-6 h-6" />
                                Encontrar duo
                            </button>
                        </footer>
                    </form>
                </Dialog.Description>
                <Dialog.Close />
            </Dialog.Content>
        </Dialog.Portal>
    )

}
import { Itypes } from "../interfaces/types/index";
import { ItypesRequest } from "../interfaces/types/index";
import { Request, Response } from "express";
import createTypesService from "../services/types/createTypes.service";
import listTypesService from "../services/types/listTypes.service";
import updateTypesService from "../services/types/updateTypes.service";
import deleteTypesService from "../services/types/deleteTypes.service";

const createTypesController = async (req: Request, res: Response) => {
  const typesData: ItypesRequest = req.body;
  const type = await createTypesService(typesData);
  return res.status(201).json(type);
};

const listTypesController = async (req: Request, res: Response) => {
  const types: Itypes[] = await listTypesService();
  return res.status(200).json(types);
};

const updateTypesController = async (req: Request, res: Response) => {
  const typesData: ItypesRequest = req.body;
  const idType: string = req.params.id;
  const updateType = await updateTypesService(typesData, idType);
  return res.status(200).json(updateType);
};

const deleteTypesController = async (req: Request, res: Response) => {
  const idType: string = req.params.id;
  const deleteType = await deleteTypesService(idType);
  return res.status(204).json({});
};
export {
  createTypesController,
  listTypesController,
  updateTypesController,
  deleteTypesController,
};

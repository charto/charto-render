// This file is part of charto-render, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { Point } from 'geobabel';
import { BBox, Layer, LayerFeatures } from 'charto-model';

export interface CanvasRendererOptions {
	canvas: HTMLCanvasElement;
	features: LayerFeatures;
	bbox: BBox;
	pixelWidth: number;
	pixelHeight: number;
	pixelRatio?: number;
	zoom?: number;
}

export interface CanvasRendererState {
	gc: CanvasRenderingContext2D;
	pointRadius: number;
	offsetX: number;
	offsetY: number;
	scaleX: number;
	scaleY: number;
}

export function circle(gc: CanvasRenderingContext2D, x: number, y: number, r: number) {
	gc.beginPath();
	gc.moveTo(x, y - r);
	gc.arcTo(x + r, y - r, x + r, y, r);
	gc.arcTo(x + r, y + r, x, y + r, r);
	gc.arcTo(x - r, y + r, x - r, y, r);
	gc.arcTo(x - r, y - r, x, y - r, r);
}

export function renderPoint(geom: Point, state: CanvasRendererState) {
	const x = geom.pos[1] * state.scaleX + state.offsetX;
	const y = geom.pos[0] * state.scaleY + state.offsetY;

	state.gc.beginPath();
	circle(state.gc, x, y, state.pointRadius);
}

export class CanvasRenderer {

	render(options: CanvasRendererOptions) {
		const { s, w, n, e } = options.bbox;
		const pixelRatio = options.pixelRatio || 1;
		const scaleX = options.pixelWidth / (e - w);
		const scaleY = options.pixelHeight / (s - n);

		const gc = options.canvas.getContext('2d')!;
		const state: CanvasRendererState = {
			gc,
			pointRadius: 6 * pixelRatio,
			offsetX: -w * scaleX,
			offsetY: -n * scaleY,
			scaleX,
			scaleY
		};

		gc.lineWidth = 2 * pixelRatio;
		gc.strokeStyle = 'rgb(192, 160, 128)';
		gc.fillStyle = 'rgba(224, 192, 160, 0.5)';

		for(let LayerFeatures of options.features) {
			for(let feature of LayerFeatures.features) {
				for(let geom of feature.geometries) {
					if(geom instanceof Point) {
						renderPoint(geom, state);
						gc.fill();
						gc.stroke();
					}
				}
			}
		}
	}

}

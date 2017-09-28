// This file is part of charto-render, copyright (c) 2017 BusFaster Ltd.
// Released under the MIT license, see LICENSE.

import { BBox, Layer, LayerFeatures } from 'charto-model';

export interface CanvasRendererOptions {
	canvas: HTMLCanvasElement;
	features: LayerFeatures;
	bbox: BBox;
	pixelWidth: number;
	pixelHeight: number;
	zoom?: number;
}

export class CanvasRenderer {

	render(options: CanvasRendererOptions) {
		const gc = options.canvas.getContext('2d')!;

		gc.beginPath();
		gc.rect(0, 0, options.pixelWidth, options.pixelHeight);
		gc.lineWidth = 2;
		gc.strokeStyle = '#000000';
		gc.stroke();

		gc.font = '20px sans-serif';
		gc.fillStyle = '#000000';
		gc.fillText(options.bbox.s + ' / ' + options.bbox.w + ' / ' + options.zoom, 0, 16);
	}

}
